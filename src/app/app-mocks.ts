import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockEstimatorTypesInterceptor } from './mocks/estimatorTypes.interceptor';
import { MockEstimatorModelsInterceptor } from './mocks/estimatorModels.interceptor';
import { MockSearchInterceptor } from './mocks/search.interceptor';

export const AppMockInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: MockSearchInterceptor, multi:true },
  { provide: HTTP_INTERCEPTORS, useClass: MockEstimatorTypesInterceptor, multi:true }
]
