import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {SkillType} from "../../../domain/skilltype.dto";

@Injectable()
export class SkilltypeService {

  constructor(
    private http: HttpClient
  ) {}

  getAllSkillTypes(): Observable<string[]> {
    return this.http.get<string[]>(environment.api.skilltypes.all);
  }

  getSkillTypeById(skilltypeId: number): Observable<string> {
    return this.http.get<string>(environment.api.skilltypes.byId(skilltypeId));
  }

  createSkillType(skilltype: string): Observable<string> {
    const skill: SkillType = {
      type: skilltype
    };
    return this.http.post<string>(environment.api.skilltypes.create, skill);
  }
}
