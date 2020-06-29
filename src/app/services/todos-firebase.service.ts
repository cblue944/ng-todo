import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Todo} from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosFirebaseService {
  constructor(private firestore: AngularFirestore) {
  }

  getTodos() {
    return this.firestore.collection('todos').snapshotChanges();
  }

  createTodo(todo: Todo) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('todos')
        .add({
          title: todo.title,
          description: todo.description,
          isDone: todo.isDone
        })
        .then(res => {
        }, err => reject(err));
    });
  }

  updateTodo(todo: Todo) {
    delete todo.id;
    this.firestore.doc('todos/' + todo.id).update(todo);
  }

  deleteTodo(todoId: string) {
    this.firestore.doc('todos/' + todoId).delete();
  }
}
