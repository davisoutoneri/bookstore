import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  id_categoria: String = ''

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router  
  ) { }

  ngOnInit(): void {
    this.id_categoria = this.route.snapshot.paramMap.get('id_cat')!;
    this.livro.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void{
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta
    });
  }

  delete():void {
    this.service.delete(this.livro.id!).subscribe(() => {
      this.router.navigate(['categorias/'+`${this.id_categoria}`+'/livros'])
      this.service.mensagem('Livro deletado com sucesso!')
    }, err => {
      this.service.mensagem('Falha ao deletar livro! Tente mais tarde!')
    })
  }

  cancel(){
    this.router.navigate(['categorias/'+`${this.id_categoria}`+'/livros'])
  }

}
