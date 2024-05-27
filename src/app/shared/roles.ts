export const Roles = {
    ADMIN: 'admin',
    PROF: 'professeur',
    ELEVE: 'etudiant',
    DEFAULT: 'default'
  };
  
  export const RolePages = {
    [Roles.ADMIN]: ['/professeurs', '/eleves','/eleve/ajout', '/professeur/matieres','/professeur/ajout','/assignements','/assignement','/detail-assignement','/performance','/profile'],
    [Roles.PROF]: ['/assignement/ajout-assignement', '/assignements','/assignement','/detail-assignement','/valider-assignements-eleves','/performance','/assignement/modification','/profile'],
    [Roles.ELEVE]: ['/assignement', '/detail-assignement','/mes-assignements','/performance','/profile']
  };