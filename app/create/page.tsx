import Button from "@/components/Button/Button"

const CreatePage = () => {
  return (
    <div>
      <h1>Create a project</h1>
      <form>
        <div>
          <label htmlFor='name'>Name:</label>
          <input id='name' type='text' name='name' required />
        </div>
        <div>
          <label htmlFor='description'>Description:</label>
          <input id='description' type='description' name='description' />
        </div>
        <Button type='submit'>Sign up!</Button>
      </form>
    </div>
  )
}

export default CreatePage
