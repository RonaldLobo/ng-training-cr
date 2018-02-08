import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-producto-display',
  templateUrl: './producto-display.component.html',
  styleUrls: ['./producto-display.component.css']
})
export class ProductoDisplayComponent implements OnInit {
	@Input() producto : Producto;
	@Output() borrarProducto = new EventEmitter<Producto>();
	@Output() editarProducto = new EventEmitter<Producto>();
	public isDeleting = false;

	constructor(private productosService:ProductosService) { }

	ngOnInit() {
		
	}

	borrar(){
		this.isDeleting = true;
		this.borrarProducto.emit(this.producto);
	}


	editar(){
		this.editarProducto.emit(this.producto);
	}

}
