import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Todo} from '../interfaces/todo';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosFirebaseService {

  private path;

  constructor(private firestore: AngularFirestore) {
  }

  setListId(id: string) {
    this.path = 'lists/' + id + '/todos';
  }

  getTodos() {
    return this.firestore.collection(this.path).snapshotChanges();
  }

  createTodo(todo: Todo) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(this.path)
        .add({
          title: todo.title,
          description: todo.description,
          isDone: todo.isDone
        })
        .then(res => {
        }, err => reject(err));
    });
  }

  createTodoIfNew(todo: Todo) {
    return this.firestore.doc(this.path + '/' + todo.id).get().toPromise()
      .then(docSnapshot => {
        if (!docSnapshot.exists) {
          return this.createTodo(todo);
        }
      });
  }

  createNewList() {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('lists')
        .add({
          todos: [] as Todo[]
        })
        .then(res => {
          this.setListId(res.id);
          resolve(res.id);
        }, err => reject(err));
    });
  }

  updateTodo(todo: Todo) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection(this.path).doc(todo.id).set(todo, {merge: true})
        .then(res => {
        }, err => reject(err));
    });
  }

  deleteTodo(todoId: string) {
    this.firestore.doc(this.path + '/' + todoId).delete();
  }

}
