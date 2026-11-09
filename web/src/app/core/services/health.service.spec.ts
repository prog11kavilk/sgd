import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let service: HealthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(HealthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('chama GET /health e devolve a resposta', () => {
    let resultado: unknown;
    service.check().subscribe((r) => (resultado = r));

    const req = httpMock.expectOne(`${environment.apiUrl}/health`);
    expect(req.request.method).toBe('GET');
    req.flush({ status: 'UP' });

    expect(resultado).toEqual({ status: 'UP' });
  });

  it('propaga erro HTTP', () => {
    let status: number | undefined;
    service.check().subscribe({ error: (e) => (status = e.status) });

    httpMock
      .expectOne(`${environment.apiUrl}/health`)
      .flush('falha', { status: 500, statusText: 'Server Error' });

    expect(status).toBe(500);
  });
});
