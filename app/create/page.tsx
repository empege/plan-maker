import Button from "@/components/Button/Button"
import { createProject } from "@/app/actions"

const CreatePage = () => {
  return (
    <div>
      <h1>Create a project</h1>
      <form action={createProject}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input id='name' type='text' name='name' required />
        </div>
        <div>
          <label htmlFor='description'>Description:</label>
          <input id='description' type='description' name='description' />
        </div>
        <Button type='submit'>Create!</Button>
      </form>
    </div>
  )
}

export default CreatePage
