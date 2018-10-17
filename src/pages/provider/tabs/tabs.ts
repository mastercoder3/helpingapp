import { Component  } from '@angular/core';
import { RequestsPage } from '../requests/requests';
import { JobsPage } from '../jobs/jobs';
import { ReviewPage } from '../review/review';
import { AccountPage } from '../account/account';
import { ChatslistPage } from '../chatslist/chatslist';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RequestsPage;
  tab2Root = JobsPage;
  tab3Root = ReviewPage;
  tab4Root = AccountPage;
  tab5Root = ChatslistPage;

  constructor() { }


}
