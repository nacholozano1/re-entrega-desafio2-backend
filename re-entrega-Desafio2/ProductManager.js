// DESAFIO Nº2 - IGNACIO LOZANO - RE-ENTREGA

import { promises as fs, existsSync, writeFileSync } from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.checkFile();
  }

  checkFile = () => {
    // Si existe el archivo no hace nada, sino lo crea
    if (!existsSync(this.path)) {
      writeFileSync(this.path, "[]", "utf-8");
    }
  };

  async addProduct(title, description, price, thumbnail, code, stock) {
    const prodObject = { title, description, price, thumbnail, code, stock };

    // Checkea si el producto le falta data
    if (Object.values(prodObject).includes("") || Object.values(prodObject).includes(null)) {
      console.log("Campo del producto faltante");
      return;
    }
  
    this.checkFile();
    try {
      const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
      if (data.some((elem) => elem.code === prodObject.code)) {
        throw "El código " + code + " ya existe, no es posible agregarlo.";
      }
  
      const newID = data.length ? data[data.length - 1].id + 1 : 1;
      data.push({ ...prodObject, id: newID });
      await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
    } catch (err) {
      console.error(err);
    }
  }

  async getProducts() {
    const read = await fs.readFile(this.path, "utf-8");
    const data = JSON.parse(read);
    console.log(data);
    return data;
  }

  async getProductByID(id) {
    this.checkFile();
    try {
      const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
      const found = data.find((prod) => prod.id === id);
      if (!found) {
        throw "ID no encontrado";
      }
  
      console.log(found);
      return found;
    } catch (err) {
      console.error(err);
    }
  }

  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    this.checkFile();
    try {
      const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
      const index = data.findIndex((prod) => prod.id === id);
      if (index === -1) {
        throw "ID no encontrado";
      }
  
      const product = data[index];
      product.title = title;
      product.description = description;
      product.price = price;
      product.thumbnail = thumbnail;
      product.code = code;
      product.stock = stock;
      await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
    } catch (err) {
      console.error(err);
    }
  }

  async deleteProduct(id) {
    this.checkFile();
    try {
      const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
      const index = data.findIndex((prod) => prod.id === id);
      if (index === -1) {
        throw "ID " + id + " no encontrado";
      }
  
      data.splice(index, 1);
      await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
    } catch (err) {
      console.error(err);
    }
  }
}

// TEST

/* 

COPIAR Y PEGAR EN NODE PARA NO TENER QUE ESCRIBIRLO 20 VECES 😅 :

node ProductManager.js 

*/

// Crear ProductManager
const manager = new ProductManager("./data.json");

// AGREGAR PRODUCTOS
//manager.addProduct("Elden Ring", "El mejor juego del año 2022", 4999, "img/juegos/elden-ring.jpg", "1A", 500)
//manager.addProduct("Call of Duty: Modern Warefare 2", "Juegazo de guerra", 7999, "img/juegos/modern-warfare-2.jpg", "2A", 500)
//manager.addProduct("FIFA 23", "El mejor juego de futbol", 7999, "img/juegos/fifa-23.jpg", "3A", 500);
//manager.addProduct("Lego Star Wars: The Skywalker Saga", "Una palabra, tres silabas. JUE-GA-ZO", 6999, "img/juegos/lego_star_wars.jpg", "4A", 500)
//manager.addProduct("","","","","","");
//manager.addProduct("producto test","Hola soy un producto de prueba","3300","img/nada","5A","500");

// VER PRODUCTOS EN NODE
//manager.getProducts();

// ENCONTRAR POR ID
//manager.getProductByID(2);

// CUANDO NO ENCUENTRA POR ID
//manager.getProductByID(7);

// ACTUALIZAR UN PRODUCTO CON ID QUE EXISTE
//manager.updateProduct(1, "Forza Horizon 5", "El mejor juego de carreras", 5999, "img/juegos/horizon-5.jpg", "6A", 500);

// ACTUALIZAR UN PRODUCTO CON ID QUE NO EXISTE
//manager.updateProduct(7, "Forza Horizon 5", "El mejor juego de carreras", 5999, "img/juegos/horizon-5.jpg", "6A", 500);

// BORRAR PRODUCTO
//manager.deleteProduct(1)
