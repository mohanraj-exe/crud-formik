import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import './Styling.css';

class App extends React.Component{

  constructor(){
    super()
    this.state = {
      products:[]
    }
  }

    initialValue = {
    productName: '',
    sku: '',
    productCategory: '',
    mrp: '',
    productWeight: '',
    productDimension:'',
    id:''
  };

  validate = (formData) => {
    var errors = {};
    if (formData.productName === '')      errors.productName = 'Product Name Field is Required';
    if (formData.sku === '')              errors.sku = 'SKU Field is Required';
    if (formData.productCategory === '')  errors.productCategory = 'Product Category Field is Required';
    if (formData.mrp === '')              errors.mrp = 'MRP Field is Required';
    if (formData.productWeight === '')    errors.productWeight = 'Product Weight Field is Required';
    if (formData.productDimension === '') errors.productDimension = 'Product Dimension Field is Required';
    return errors;
  };

  // cRud-Read

  async componentDidMount(){
    var response = await axios.get('https://620fad6fec8b2ee2834903e1.mockapi.io/products')
    this.setState({products: response.data})
    console.log(response.data)
  }

    populateData = (id) => {
    let selectedData = this.state.products.filter(row => row.id === id)[0]

      this.initialValue = {
      productName: selectedData.productName,
      sku: selectedData.sku,
      productCategory: selectedData.productCategory,
      mrp: selectedData.mrp,
      productWeight: selectedData.productWeight,
      productDimension: selectedData.productDimension,
      id: selectedData.id
    }
    console.log(selectedData)
}

    handleSubmit = async (formData,{resetForm}) => {

    if(formData.id){

      // crUd-Update
      let response = await axios.put(`https://620fad6fec8b2ee2834903e1.mockapi.io/products/${formData.id}`,{
        productName: formData.productName,
        sku: formData.sku,
        productCategory: formData.productCategory,
        mrp: formData.mrp,
        productWeight: formData.productWeight,
        productDimension: formData.productDimension,
        id: formData.id
      })
      
      var index = this.state.products.findIndex(row => row.id === response.data.id)
      let products = [...this.state.products]
      products[index] = response.data

      this.setState({products})
      formData.productName = '';
      formData.sku = '';
      formData.productCategory = '';
      formData.mrp = '';
      formData.productWeight = '';
      formData.productDimension = ''

      resetForm();
    }

    else{
      // Crud-Create
      let response = await axios.post('https://620fad6fec8b2ee2834903e1.mockapi.io/products',formData)
      console.log(formData)

      let products = [...this.state.products]
      products.push(response.data)
  
      this.setState({products})
      formData.productName = '';
      formData.sku = '';
      formData.productCategory = '';
      formData.mrp = '';
      formData.productWeight = '';
      formData.productDimension = ''
      
      resetForm();
    }
  };

  handleDelete = async (id)=>{
    await axios.delete(`https://620fad6fec8b2ee2834903e1.mockapi.io/products/${id}`)

    var products = this.state.products.filter((row) =>row.id!== id)
    this.setState({products})
}

render(){
  return (
    <>
      <Formik
        initialValues={this.initialValue}
        validate={(formData) => this.validate(formData)}
        onSubmit={(formData,{resetForm}) => this.handleSubmit(formData,{resetForm})}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          resetForm
          /* and other goodies */
        }) => (

          <form onSubmit={handleSubmit}
          style={{border: "5px #04AA6D outset", 
                    position: "relative", top: "50px",
                    left: "425px",  width: "375px",
                    margin:"5px",padding:"5px"}}
          ><div>
          <h2 style={{textAlign: 'center'}}> Product-Form </h2>
          </div>
            <div style={{display: "none"}}>
              <label style={{position:"relative"}}> ID: </label>
              <input
                type="text"
                name="id"
                value={values.id}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{position:"absolute",right:"20px"}}
              />
              <br /><br />
              <span style={{ color: 'red' }}>
                {touched.id && errors.id}
              </span>
            </div>
            <div>
              <label style={{position:"relative"}}> Product Name: </label>
              <input
                type="text"
                name="productName"
                value={values.productName}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{position:"absolute",right:"20px"}}
              />
              <br />
              <span style={{ color: 'red' }}>
                {touched.productName && errors.productName}
              </span>
            </div>
            <br />
            <div>
              <label style={{position:"relative"}}> SKU </label>
              <input
                type="text"
                name="sku"
                value={values.sku}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{position:"absolute",right:"20px"}}
              />
              <br />
              <span style={{ color: 'red' }}>
                {touched.sku && errors.sku}
              </span>
            </div>
            <br />
            <div>
              <label style={{position:"relative"}}> Product Category: </label>
              <input
                type="text"
                name="productCategory"
                value={values.productCategory}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{position:"absolute",right:"20px"}}
              />
              <br />
              <span style={{ color: 'red' }}>
                {touched.productCategory && errors.productCategory}
              </span>
            </div>
            <br />
            <div>
              <label style={{position:"relative"}}> MRP: </label>
              <input
                type="text"
                name="mrp"
                value={values.mrp}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{position:"absolute",right:"20px"}}
              />
              <br />
              <span style={{ color: 'red' }}>
                {touched.mrp && errors.mrp}
              </span>
            </div>
            <br />
            <div>
              <label style={{position:"relative"}}> Product Weight: </label>
              <input
                type="text"
                name="productWeight"
                value={values.productWeight}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{position:"absolute",right:"20px"}}
              />
              <br />
              <span style={{ color: 'red' }}>
                {touched.productWeight && errors.productWeight}
              </span>
            </div>
            <br />
            <div>
              <label style={{position:"relative"}}> Product Dimension: </label>
              <input
                type="text"
                name="productDimension"
                value={values.productDimension}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{position:"absolute",right:"20px"}}
              />
              <br />
              <span style={{ color: 'red' }}>
                {touched.productDimension && errors.productDimension}
              </span>
            </div>
            <br />
        
            <div style={{position:"relative"}}>
              <button type="submit" disabled={isSubmitting}
              style={{position:"absolute",left:"150px", bottom:"2px"}}>Submit</button>
              &nbsp;
              <button type="button" onClick={resetForm}
              style={{position:"absolute",right:"45px", bottom:"2px"}}> Reset </button>&nbsp;
            </div>
          </form>
        )}
      </Formik>

      <div style={{position:"relative", left:"100px",top:"50px"}}>
      <h2 style={{paddingLeft:"20px"}}>Product-Information</h2>
      <table border={1} style={{position:"absolute", left:"15px"}}>
          <thead>
              <tr>
                  <td>ID</td>
                  <td>Product Name</td>
                  <td>SKU</td>
                  <td>Product Category</td>
                  <td>MRP</td>
                  <td>Product Weight</td>
                  <td>Product Dimension</td>
                  <td>Actions</td>
              </tr>
          </thead>
          <tbody>
              {this.state.products.map(row =>
                  <tr>
                      <td>{row.id}</td>
                      <td>{row.productName}</td>
                      <td>{row.sku}</td>
                      <td>{row.productCategory}</td>
                      <td>{row.mrp}</td>
                      <td>{row.productWeight}</td>
                      <td>{row.productDimension}</td>
                      <td>
                          <button onClick={()=> this.populateData(row.id)}>Edit</button> &nbsp;
                          <button onClick={()=> this.handleDelete(row.id)}>Delete</button>
                      </td>   
                  </tr>
              )}
          </tbody>
      </table>
      </div>
    </>
  );
}
}

export default App;