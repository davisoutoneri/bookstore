import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from './../livro.service';
import { Livro } from './../livro.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  displayedColumns: string[] = ["id", "titulo", "livros", "acoes"]

  id_categoria: String = '';

  livros: Livro[] = [];

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_categoria = this.route.snapshot.paramMap.get('id_cat')!;
    this.findAll();
  }
  
  findAll():void{
    this.service.findAllByCategoria(this.id_categoria!).subscribe((resposta) =>{
      this.livros = resposta;
      console.log(this.livros);
    })
  }

  navegarParaCriarLivro() {
    this.router.navigate(['categorias/'+`${this.id_categoria}`+'/livros/create']);
  }
}
