import React from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {  // instead of using props we can
  return (                                          // destructure it so we can use directly
        // values of props can change and overwrite previous value and new value will be 
        // used by parent component if used 
    <>                                           
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <input type="text" className="form-control" placeholder='Enter new Category' value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>

  )
}

export default CategoryForm