import { platformBrowser } from '@angular/platform-browser';
import { PostModule } from './app/posts/post.module';

platformBrowser()
  .bootstrapModule(PostModule)
  .catch(err => console.error(err));