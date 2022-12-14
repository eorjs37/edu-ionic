import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: () => import('./page/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'list-detail',
    loadChildren: () => import('./page/list-detail/list-detail.module').then( m => m.ListDetailPageModule)
  },
  {
    path: 'voice-record',
    loadChildren: () => import('./page/voice-record/voice-record.module').then( m => m.VoiceRecordPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
