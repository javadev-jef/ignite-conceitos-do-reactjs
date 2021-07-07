import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [lastId, setLastId] = useState<number>(0);

  function handleCreateNewTask() {

    if(!newTaskTitle.trim()) {
      alert('O titulo da task não pode ser vázio');
      return;
    }

    const existsTask = tasks.filter(task =>
      task.title.toLowerCase() === newTaskTitle.trim().toLowerCase()
    );

    if(existsTask.length > 0) {
      alert('A tarefa informada já foi cadastrada.');
      return;
    }
    
    const taskId = lastId + 1;
    const currentTask: Task = {
      id: taskId, 
      isComplete: false,
      title: newTaskTitle.trim()
    }

    setTasks([...tasks, currentTask]);
    setNewTaskTitle('');
    setLastId(taskId);
  }

  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map(task => {
      if(task.id === id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    const currentTask = tasks.filter(task => task.id == id)[0];
    if(currentTask.isComplete) {
      const message = 'A task a ser excluída já foi concluída, tem certeza que deseja realizar a exclusão?';
      if(confirm(message)) {
        removeTask(id);
      }
      return;
    }
    removeTask(id);
  }

  function removeTask(id: number) {
    const newTasks = tasks.filter(task => task.id != id);
    setTasks(newTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}