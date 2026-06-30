import { Routes } from '@angular/router';
import { ControlFlow } from './Component/control-flow/control-flow';
import { DataBinding } from './Component/data-binding/data-binding';
import { single } from 'rxjs';
import { Signal } from './Component/signal/signal';
import { User } from './Component/user/user';
import { NotFound } from './Component/not-found/not-found';
import { ApiCallCrud } from './Component/api-call-crud/api-call-crud';

export const routes: Routes = [

    {
        path: '',                       //default route - it will load automatically if there is no route provided.
        redirectTo: 'Apicall',
        pathMatch: 'full'
    },


    {
        path: 'control-flow',
        component: ControlFlow
    },

    {
        path: 'data-binding',
        component: DataBinding
    },

    {
        path: 'signal',
        component: Signal
    },
    {
        path: 'user',
        component: User
    },
     {
        path: 'Apicall',
        component: ApiCallCrud
    },

    {
        path: '**',      //wild component - if we placed wrong route in url it will not break our application.
        component: NotFound

    }

];
