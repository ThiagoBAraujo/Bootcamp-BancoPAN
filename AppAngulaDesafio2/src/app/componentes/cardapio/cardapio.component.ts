import { ICardapio, CardapioService } from './../../cardapio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css'],
})
export class CardapioComponent implements OnInit {
  produtos: ICardapio[] = [];

  constructor(private cardapioService: CardapioService) {}

  ngOnInit(): void {
    this.cardapioService.listarCardapio().subscribe((produtos) => {
      this.produtos = produtos;
    });
  }
  adicionaProduto(produto: ICardapio) {
    this.cardapioService.adicionaProduto(produto);
  }

  get quantidadeTotal(): number {
    return this.cardapioService.getQuantidadeTotal();
  }

  get valorTotal(): number {
    return this.cardapioService.getValorTotal();
  }
}
