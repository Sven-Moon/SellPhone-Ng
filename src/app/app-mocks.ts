import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockSearchInterceptor } from './mocks/search.interceptor';

export const AppMockInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: MockSearchInterceptor, multi:true },
]
