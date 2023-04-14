import { menuArray } from './data.js';

const eachSelectedItemPrice = [];
const orderedItem = [];
const idOfEach = [];
const orderedItemId = []

const orderBox = document.getElementById("order-box")
const finalPrice = document.getElementById("final-price")
const orderCompleteBtn = document.getElementById("complete-order-btn")
const checkoutForm = document.getElementById("checkout-form")
const paymentForm = document.getElementById("payment-form")
const paymentBtn = document.getElementById("payment-btn")
const orderItemContainer = document.getElementById("order-items-container")

// Function Rendering Menu Items on the Screen

function getFeedHtml(){

    let feedHtml = ``

    menuArray.forEach(function(feed){
    feedHtml += `
    <div class="model" id="model">
        
        <div class="model-inner">
            <p class="logo" id="logo"> ${feed.emoji} </p>
            <div>
                <h2>${feed.name}</h2>
                <p class="ingredients">${feed.ingredients}</p>
                <p>$${feed.price}</p>
            </div>
        </div>

        <div class="increment-btn"> 
            <button class="add-btn" id="add-btn" data-add="${feed.id}"> <span class="plus">+</span> </button> 
        </div>
    </div>`

})

return feedHtml
}

document.getElementById('feed').innerHTML = getFeedHtml()

// Declaring Event Listners

document.addEventListener('click',function(event){
    if(event.target.dataset.add){
      addItem(event.target.dataset.add)
    
      //   styling
      document.getElementById("order-bucket-heading").style.display = "block"
      document.getElementById("complete-order-btn").style.display = "block"
      document.getElementById("total-container").style.display = "flex"
    }
    else if (event.target.dataset.remove) {
        removeItem(event.target.dataset.remove)
    }
   })
   
   //  Function to Display Ordered Items
   
   function addItem(menuId){
    const selectedItem = menuArray.filter(function(menu){
       return menu.id == menuId
       })[0]

   console.log(selectedItem)

       let addItem =' ';
       addItem = `<div class="item-name-price">
                           <div class = "order-container">
                                <div class="remove-item">
                                        <p class="item-name">${selectedItem.name}</p>
                                        <p class="remove-item-btn" data-remove="${selectedItem.id}">remove</p>
                                </div>
                                <div>
                                        <p id="price-selected-item">$ ${selectedItem.price}</p>
                                </div>
                           </div>
                      </div>`;
    
       orderedItem.push(addItem)
       orderedItemId.push(selectedItem.id)

       console.log(orderedItem)

       orderBox.innerHTML = orderedItem
       totalPriceCalc(selectedItem)
   }

//    Total price Calculation

   function totalPriceCalc(items) {
    
    idOfEach.push(items.id)
    eachSelectedItemPrice.push(items.price)

    let totalPrice = eachSelectedItemPrice.reduce(myFunc)
    function myFunc (total, value) {
        return total + value ;
    }

    finalPrice.innerHTML = `$ ${totalPrice}`

   }

//    Remove Item from Selected List

function removeItem(menuId){
    // const toRemoveItem = orderedItem.filter(function(menu){
    //  return menu.id == menuId
    // })[0]

 console.log("id of remove", menuId)
 let x;
 x = idOfEach.indexOf(menuId);
 console.log("orderedItemid", orderedItemId)
 console.log("menuId",menuId);
 console.log("ID of EACH",idOfEach);
 console.log("id", x);
 orderedItem.splice(x,1)
 orderBox.innerHTML = orderedItem   
 }
 
 orderCompleteBtn.addEventListener("click", function(){
    console.log("clicked")
    checkoutForm.style.display = 'inline';
 })

//  Payment Form

paymentForm.addEventListener('submit', function(event){
    event.preventDefault()
    
    const paymentFormData = new FormData(paymentForm)
    const fullName = paymentFormData.get('fullName')
    console.log(fullName)

    orderItemContainer.innerHTML = `
    <div>
        <p class = "final-message"> 
            Thanks! <span class="modal-display-name">${fullName}</span> Your order is on its way. 
        </p>
    </div>
    `
    checkoutForm.style.display = 'none';
    document.getElementById("complete-order-btn").style.display = "none"

 })