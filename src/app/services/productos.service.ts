import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { DataService } from '../services/data.service';

@Injectable()
export class ProductosService {
	
	constructor(private dataService:DataService) { }

	public obtenerProductos(){
		return this.dataService.get('/api/products');
	}

	public agregarProducto(producto:Producto){
		return this.dataService.post('/api/products',{'product':producto});
	}

	public borrarProducto(producto:Producto){
		return this.dataService.delete('/api/products/'+producto._id);
	}

	public editarProducto(producto:Producto){
		return this.dataService.put('/api/products/'+producto._id,{'product':producto});
	}
}
