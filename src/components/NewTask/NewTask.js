import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  const {isLoading , error , sendRequest : sendTaskRequest} = useHttp();

  const createTask = (taskData , taskText) => {
    const generatedId = taskData.name;
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask)
  }

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url : 'https://react-http-ef6d7-default-rtdb.firebaseio.com/tasks.json' ,
      method: 'POST',
      headers: {
            'Content-Type': 'application/json',
      },
      body: {text : taskText},
    },
     (taskData) => createTask(taskData, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
