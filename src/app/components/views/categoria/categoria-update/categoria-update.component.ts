import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Categoria } from '../categoria.model';
import { CategoriaService } from './../categoria.service';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css'],
})
export class CategoriaUpdateComponent implements OnInit {
  categoria: Categoria = {
    nome: '',
    descricao: '',
  }

  constructor(
    private router: Router,
    private service: CategoriaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe(resposta => {
      (this.categoria.nome = resposta.nome),
        (this.categoria.descricao = resposta.descricao);
    })
  }

  update() { 
    this.service.update(this.categoria).subscribe((resposta) => {

      this.router.navigate(['/categorias'])
      this.service.mensagem('Categoria atualizada com sucesso!')
    }, err => {
      console.log(err),
      this.service.mensagem('Validar se todos os campos estão preenchidos corretamente!');
    })
  }

  cancel() {
    this.router.navigate(['/categorias']);
  }
}
