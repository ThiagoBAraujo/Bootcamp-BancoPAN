import { ICardapio, CardapioService } from './../../cardapio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent {
  constructor(private cardapioService: CardapioService) {}

  get itens() {
    return this.cardapioService.getItens();
  }

  get valorTotal(): number {
    return this.cardapioService.getValorTotal();
  }

  limpaPedido() {
    this.cardapioService.limpaPedido();
  }
}
