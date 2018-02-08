import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { patternValidator } from '../../shared/pattern-validator';

@Component({
	selector: 'app-usuario-agregar',
	templateUrl: './usuario-agregar.component.html',
	styleUrls: ['./usuario-agregar.component.css']
})
export class UsuarioAgregarComponent implements OnInit {
	@Output() agregarUsuario = new EventEmitter<any>();
	@Output() editarUsuario = new EventEmitter<any>();
	public usuarioForm: FormGroup;
	@Input() canAdd : boolean = true;
	@Input('selectedUsuario') usuario: Usuario = new Usuario();
	public submitted: boolean = false;
	public isEditing: boolean = false;

	constructor(private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.createForm();
	}

	createForm() {
		this.usuarioForm = this.formBuilder.group({
			_id: new FormControl(undefined),
			usuario: new FormControl('', [Validators.required]),
			nombre: new FormControl('', [
				Validators.required, 
				Validators.minLength(2), 
				Validators.maxLength(7)
			]),
			apellido1: new FormControl('', [Validators.required]),
			correo: new FormControl('', [Validators.required,patternValidator(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)])
		});
	}

	onSubmit() {
		if(this.isEditing){
			this.editarUsuario.emit({usuario:this.usuarioForm.value,form:this.usuarioForm});
			this.isEditing = false;
		} else {
			this.agregarUsuario.emit({usuario:this.usuarioForm.value,form:this.usuarioForm});
		}
		this.submitted = true; 
	}

	ngOnChanges(changes){
		console.log('changes',changes)
		if(changes.usuario && changes.usuario.currentValue._id){
			console.log('is editing');
			this.usuarioForm.setValue(changes.usuario.currentValue);
			this.isEditing = true;
		}
	}

	revert(){
		this.usuarioForm.reset();
		this.submitted = false;
		this.isEditing = false;
	}

}
