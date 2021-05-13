import {MatDialogConfig} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
export class sharedUtils {

  constructor() {
  }

  public static goTo(location: string, route: ActivatedRoute) {
    route.fragment.subscribe(f => {
      setTimeout(() => {// 需一段時間搜尋才找得到??????沒加會找不到div
        const element = document.getElementById(location);
        // console.log(location);
        // console.log(element);
        if (element) {
          element.scrollIntoView({behavior: 'smooth'});
        }
      }, 0);
    });
  }

  /**
   *
   * @param id
   * @param title
   * @param dialogContents
   * @returns {MatDialogConfig}
   */
  public static myDialogConfig(id: any, title: string, dialogContents: any): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.data = {
      id,
      title,
      contents: dialogContents
    };
    return dialogConfig;
  }

  /**
   * 表單驗證：至少填一個
   * @param validator
   */
  public static atLeastOne = (validator: ValidatorFn) => (group: FormGroup): ValidationErrors | null => {
    const hasAtLeastOne = group && group.controls && Object.keys(group.controls)
            .some(k => !validator(group.controls[k]));

    return hasAtLeastOne ? null : {
      atLeastOne: true,
    };
  };

}
