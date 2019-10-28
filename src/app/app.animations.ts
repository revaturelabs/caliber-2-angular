import {animate, animateChild, group, sequence, state, style, transition, trigger} from "@angular/animations";

export const enterFromLeft = [
  style({ transform: 'translateX(-50%)' }),
  animate('150ms ease-in-out', style({ transform: 'translateX(0%)' })),
  animateChild()
];

export const exitToRight = [
  style({ transform: 'translateX(50%)' }),
  animate('150ms ease-in-out', style({ transform: 'translateX(0%)' })),
  animateChild()
];

export const routeAnimations = trigger("routeAnimations", [
  transition('HomePage => ManageBatchPage', enterFromLeft),
  transition('HomePage => AssessBatchPage', enterFromLeft),
  transition('HomePage => QualityAuditPage', enterFromLeft),
  transition('HomePage => ReportsPage', enterFromLeft),
  transition('ManageBatchPage => HomePage', exitToRight),
  transition('ManageBatchPage => AssessBatchPage', enterFromLeft),
  transition('ManageBatchPage => QualityAuditPage', enterFromLeft),
  transition('ManageBatchPage => ReportsPage', enterFromLeft),
  transition('AssessBatchPage => ManageBatchPage', exitToRight),
  transition('AssessBatchPage => HomePage', exitToRight),
  transition('AssessBatchPage => QualityAuditPage', enterFromLeft),
  transition('AssessBatchPage => ReportsPage', enterFromLeft),
  transition('QualityAuditPage => HomePage', exitToRight),
  transition('QualityAuditPage => ManageBatchPage', exitToRight),
  transition('QualityAuditPage => AssessBatchPage', exitToRight),
  transition('QualityAuditPage => ReportsPage', enterFromLeft),
  transition('ReportsPage => HomePage', exitToRight),
  transition('ReportsPage => ManageBatchPage', exitToRight),
  transition('ReportsPage => AssessBatchPage', exitToRight),
  transition('ReportsPage => QualityAuditPage', exitToRight),
  transition('* => ManageTrainersPage', enterFromLeft),
  transition('ManageTrainersPage => *', exitToRight),
  transition('* => LocationsPage', enterFromLeft),
  transition('LocationsPage => *', exitToRight),
  transition('* => CategoriesPage', enterFromLeft),
  transition('CategoriesPage => *', exitToRight)
]);

export const fadeInOut = [
  trigger('fadeInOut', [
    transition(':enter', [
      group([
        style({ opacity: 0 }),
        animate('175ms ease-in', style({ opacity: 1 })),
        animateChild()
      ])
    ]),
    transition(':leave', [
      group([
        style({ opacity: 1}),
        animate('175ms ease-out', style({ opacity: 0 })),
        animateChild()
      ])
    ])
  ])
];

export const categoriesFade = [
  trigger('longFadeInOut', [
    transition(':enter', [
      sequence([
        style({ opacity: 0, height: 'auto' }),
        animate('50ms ease-in', style({ opacity: 1, height: 'auto' })),
      ])
    ]),
    transition(':leave', [
      sequence([
        style({ opacity: 1, height: 'auto' }),
        animate('10ms 50ms', style({ opacity: 0, height: 'auto' })),
      ])
    ])
  ])
];


export const onReportTransition = [
  trigger('onReportTransition', [
    state('batch', style({ opacity: 1 })),
    state('individual', style({ opacity: 1 })),
    transition('batch <=> individual', [
      group([
        animate('25ms ease-out', style({ opacity: 0 })),
        animate('150ms ease-in', style({ opacity: 1 })),
      ])
    ])
  ])
];
