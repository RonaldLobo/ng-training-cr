import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
	selector: 'app-usuario-display',
	templateUrl: './usuario-display.component.html',
	styleUrls: ['./usuario-display.component.css']
})
export class UsuarioDisplayComponent implements OnInit {
	@Input() usuario : Usuario;
	@Output() borrarUsuario = new EventEmitter<Usuario>();
	@Output() editarUsuario = new EventEmitter<Usuario>();
	public isDeleting = false;

	constructor(private usuariosService:UsuariosService) { }

	ngOnInit() {
		
	}

	borrar(){
		this.isDeleting = true;
		this.borrarUsuario.emit(this.usuario);
	}


	editar(){
		this.editarUsuario.emit(this.usuario);
	}

}
