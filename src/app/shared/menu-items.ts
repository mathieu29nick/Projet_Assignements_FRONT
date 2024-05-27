import { Roles } from './roles';

export const MenuItems = {
  [Roles.ADMIN]: [
    { path: '/performance', label: 'Performance des élèves' , icon: 'bar_chart'},
    { path: '/professeurs', label: 'Gestion des professeurs' , icon: 'person'},
    { path: '/eleves', label: 'Gestion des professeurs' , icon: 'person'},
    { path: '/assignements', label: 'Liste des assignements' , icon: 'list'},
  ],
  [Roles.PROF]: [
    { path: '/assignements', label: 'Liste des assignements' , icon: 'list'},
    { path: '/assignement/ajout-assignement', label: 'Ajout assignement' , icon: 'add_note'},
    { path: '/valider-assignements-eleves', label: 'Validation des devoirs rendus' , icon: 'check'},
    { path: '/performance', label: 'Performance des élèves' , icon: 'bar_chart'},
  ],
  [Roles.ELEVE]: [ 
    { path: '/mes-assignements', label: 'Mes devoirs' , icon: 'description'},
    { path: '/performance', label: 'Ma performance' , icon: 'bar_chart'},
  ]
};
