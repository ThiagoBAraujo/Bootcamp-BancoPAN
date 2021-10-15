import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-selecao',
  templateUrl: './selecao.component.html',
  styleUrls: ['./selecao.component.css'],
})
export class SelecaoComponent {
  opcoesTamanho: string[] = ['300 ml', '500 ml'];

  totalAcrescimo: number = 3;

  opcoesAcrescimo: string[] = [
    'Leite condensado',
    'Banana',
    'Granola',
    'Morango',
    'Leite em pó',
    'Côco',
    'Castanha de caju',
  ];

  opcoesSelecionadas: string[] = [];

  marcaOpcao(opcao: string) {
    const index = this.opcoesSelecionadas.indexOf(opcao);
    if (index === -1) {
      this.opcoesSelecionadas.push(opcao);
    } else {
      this.opcoesSelecionadas.splice(index, 1);
    }
  }

  opcaoSelecionada(opcao: string, maxSelecionado: number): boolean {
    if (
      this.opcoesSelecionadas.length >= maxSelecionado &&
      this.opcoesSelecionadas.indexOf(opcao) === -1
    ) {
      return true;
    } else {
      return false;
    }
  }
}
