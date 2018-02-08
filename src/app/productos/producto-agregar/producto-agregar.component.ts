import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductosService } from '../../services/productos.service';
 
@Component({
	selector: 'app-producto-agregar',
	templateUrl: './producto-agregar.component.html',
	styleUrls: ['./producto-agregar.component.css']
})
export class ProductoAgregarComponent implements OnInit, OnChanges {
	@Output() agregarProducto = new EventEmitter<any>();
	@Output() editarProducto = new EventEmitter<any>();
	@Input() canAdd : boolean = true;
	@Input('selectedProduct') producto : Producto = new Producto();
	submitted = false;
	requiredText : string = 'producto';
	isEditing = false;

	onSubmit(productoForm) {
		if(this.isEditing){
			this.editarProducto.emit({
				'producto':this.producto,
				'form':productoForm
			});
			this.isEditing = false;
		} else {
			this.agregarProducto.emit({
				'producto':this.producto,
				'form':productoForm
			});
		}
		this.submitted = true; 
	}

	constructor() { }

	ngOnInit() {
	}

	ngOnChanges(changes){
		console.log('changes',changes)
		if(changes.producto && changes.producto.currentValue._id){
			console.log('is editing');
			this.isEditing = true;
		}
	}

	newProducto(){
		this.submitted = false; 
		this.isEditing = false;
		this.producto = new Producto();
	}

}
