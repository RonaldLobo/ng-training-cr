import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductosService } from '../services/productos.service';

@Component({
	selector: 'app-productos',
	templateUrl: './productos.component.html',
	styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
	public productos : Producto[];
	public selectedProduct : Producto = new Producto;
	public loading : boolean = false;
	constructor(private productosService: ProductosService) { }

	ngOnInit() {
		this.obtenerProductos();
	}

	public editarProducto(producto){
		console.log('edit',producto);
		this.selectedProduct = Object.assign({}, producto);
	}

	public editarProductoSave(producto){
		this.productosService.editarProducto(producto.producto)
			.then(data => {
				this.obtenerProductos();
			})
			.catch(error => {
				console.log('error',error);
			});
	}

	public borrarProducto(producto){
		this.productosService.borrarProducto(producto)
			.then(data => {
				this.obtenerProductos();
			})
			.catch(error => {
				console.log('error',error);
			});
	}

	public obtenerProductos(){
		this.productosService.obtenerProductos().subscribe((data) => {
				this.productos = data.product;
			},(error)=>{
				console.log('error',error);
			});
			// .then(data => {
			// 	this.productos = data.product;
			// })
			// .catch(error => {
			// 	console.log('error',error);
			// });
	}

	public agregarProducto(producto:any){
		this.loading = true;
		this.productosService.agregarProducto(producto.producto)
			.then(data => {
				console.log('producto agregado');
				producto.form.reset();
				this.loading = false;
				this.obtenerProductos();
			})
			.catch(error => {
				console.log('error',error);
			});
	}
}
