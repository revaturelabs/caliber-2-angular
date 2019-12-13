import {Injectable, Injector} from "@angular/core";
import {ApmConfiguration} from "./apm-config.model";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ApmConfigurationService {

  private config: ApmConfiguration;

  constructor(
    private injector: Injector
  ) {}

  loadApmConfiguration() {
    const http: HttpClient = this.injector.get(HttpClient);
    (async () => {
      this.config = await http.get<ApmConfiguration>("/assets/config/apm-config.json").toPromise();
    })();
  }

  getSecretToken(): string {
    return this.config && this.config.token;
  }

  getApmUrl(): string {
    return this.config && this.config.url;
  }
}
