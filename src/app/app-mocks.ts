import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockEstimatorInterceptor } from './mocks/estimator.interceptor';
import { MockSearchInterceptor } from './mocks/search.interceptor';
import { MockStaticDataInterceptor } from './mocks/staticData.interceptor';

export const AppMockInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: MockSearchInterceptor, multi:true },
  { provide: HTTP_INTERCEPTORS, useClass: MockEstimatorInterceptor, multi:true },
  { provide: HTTP_INTERCEPTORS, useClass: MockStaticDataInterceptor, multi:true }
]
