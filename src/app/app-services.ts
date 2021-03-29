// barrel
import { BsModalService } from 'ngx-bootstrap/modal';
import { EstimatorService } from './services/estimator.service';
import { ModalService } from './services/modal.service';
import { SearchService } from './services/search.service';
import { StaticDataService } from './services/staticData.service';

export const AppServices = [
  SearchService,
  EstimatorService,
  StaticDataService,
  ModalService
];
