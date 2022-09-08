import { container } from "tsyringe";

import { IDateProvider } from "./IDateProvider";
import { IMailProvider } from "./IMailProvider";
import { DayjsDateProvider } from "./implementations/DayjsDateProvider";
import { MailProvider } from "./implementations/MailProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerSingleton<IMailProvider>("MailProvider", MailProvider);
