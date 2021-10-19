import { PedidoComponent } from './componentes/pedido/pedido.component';
import { CardapioComponent } from './componentes/cardapio/cardapio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'cardapio', pathMatch: 'full' },
  { path: 'cardapio', component: CardapioComponent },
  { path: 'pedido', component: PedidoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
