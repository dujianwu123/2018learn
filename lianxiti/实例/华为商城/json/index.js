let productData = null;
let xhr = new XMLHttpRequest();
xhr.open('GET','./json/product.json',false);
xhr.onreadystatechange = () => {
  if(xhr.readyState === 4 && xhr.status === 200){
    productData = xhr.responseText;
  }
}
xhr.send(null);
console.log(productData);