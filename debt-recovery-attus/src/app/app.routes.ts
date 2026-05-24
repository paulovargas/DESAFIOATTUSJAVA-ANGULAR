import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { ClientPageComponent } from './features/Client/pages/client-page/client-page.component';
import { DebtorPageComponent } from './features/Debtor/pages/debtor-page/debtor-page.component';
import { DebtPageComponent } from './features/Debt/pages/debt-page/debt-page.component';
import { ProposalsPageComponent } from './features/Proposals/pages/proposals-page/proposals-page.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home'
            },
            {
                path: 'home',
                component: HomePageComponent
            },
            {
                path: 'clients',
                component: ClientPageComponent
            },
            {
                path: 'debtors',
                component: DebtorPageComponent
            },
            {
                path: 'debts',
                component: DebtPageComponent
            },
            {
                path: 'proposals',
                component: ProposalsPageComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
