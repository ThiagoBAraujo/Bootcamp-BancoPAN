import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ICardapio {
  categoria: string;
  descricao: string;
  preco: number;
}

interface IItemPedido {
  quantidade: number;
  produto: ICardapio;
}

const urlBase = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class CardapioService {
  itens: IItemPedido[] = [];

  constructor(private http: HttpClient) {}

  listarCardapio() {
    return this.http.get<ICardapio[]>(`${urlBase}/cardapio`);
  }

  adicionaProduto(produto: ICardapio) {
    const item = this.itens.find(
      (item) => item.produto.descricao === produto.descricao
    );
    if (item) {
      item.quantidade++;
    } else {
      this.itens.push({
        quantidade: 1,
        produto,
      });
    }
  }

  getQuantidadeTotal(): number {
    let total = 0;
    for (const item of this.itens) {
      total += item.quantidade;
    }
    return total;
  }

  getValorTotal(): number {
    let total = 0;
    for (const item of this.itens) {
      total += item.quantidade * item.produto.preco;
    }
    return total;
  }

  getItens() {
    return this.itens;
  }

  limpaPedido() {
    this.itens = [];
  }
}
