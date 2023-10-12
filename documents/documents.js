module.exports = ({cartItems,customerEmail,customerName,customerPhoneNumber,paymentMode,subtotal,tax,totalAmount})=>{
    const today = new Date()


return `<!DOCTYPE html>
<html>
  <head>
    <title>Item Bill</title>
    
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"> -->
  <style>

.bill-model{
  padding: 3vh;
}
.bill-model h1{
    font-size: 30px;
    /* text-align: center; */
    padding:10;

}
.bill-customer-details{
  margin-top: 3vh;
  margin-bottom: 1vh;
}
.bill-model p{
    margin-top: 0;
    margin-bottom: 0;
}
.bill-header{
    border-bottom: 2px dashed grey;
    padding-bottom: 20px;
    justify-content: space-between;
    display: flex;
  }
.dotted-border{
    border-bottom: 2px dashed grey;
    margin-top: 2vh;
    padding-bottom: 2vh;
}
/* Table Styles */
.table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
}

.table th,
.table td {
    padding: 10px;
    text-align: left;
}

/* Table Header Styles */
.table th {
    background-color: #eee;
    font-weight: bold;
}

/* Table Body Styles */
.table tbody tr:nth-child(odd) {
    background-color: #f2f2f2;
}

/* Table Cell Styles */
.table td {
    border-bottom: 1px solid #eee;
}

/* Remove border for last row */
.table tbody tr:last-child td {
    border-bottom: none;
}

.endtext{
  text-align: center;
}
  </style>
  </head>
  <body>
<div class='bill-model' >

  <div class='bill-header'>
    <div>
      <h1><b>ABC Store</b></h1>
    </div>
    <div>
      <p>Chiranjeev Vihar, Ghaziabad </p>
      <p>Uttar Pradesh, 201001</p>
      <p>8744929960</p>
    </div>
  </div>

  <div class='bill-customer-details '>
    <p><b>Name</b>: ${customerName}</p>
    <p><b>Phone Number</b>: ${customerPhoneNumber}</p>
    <p><b>Email</b>: ${customerEmail}</p>
    <p><b>Date</b>: ${`${today.getDate()}/ ${today.getMonth() + 1}/ ${today.getFullYear()}.`}</p>
  </div>

  <table class='table'>
    <thead>
      <tr>
        <th>Item Name</th>
        <th>Item price</th>
      </tr>
    </thead>
    <tbody>
    ${cartItems.map(item => `
    <tr>
        <td>${item.name}</td>
        <td>${item.price}</td>
    </tr>
`).join('')}
    </tbody>
  </table>

  <div class='dotted-border1 '>
    <hr>
    <p><b>Sub Total</b>: ${subtotal} Rs/-</p>
    <p><b>Tax</b>: ${tax} Rs/-</p>
  </div>

  <div class='mt-2 total'>
    <h2><b>Grand Total: ${totalAmount} Rs/-</b></h2>
  </div>

  <div class='dotted-border '></div>

  <div class='endtext'>
    <p>Thank you! Have a nice day</p>
    <p>Visit Again</p>
    <p>&#128578;&#128578;&#128578;&#128578;&#128578;</p>
  </div>
</div>      
   
  </body>
</html>`

}