
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/providers/theme-provider';
import { ReduxProvider } from '@/redux/provider';


interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: 'ru'| 'en' }>
}
export default async function LocaleLayout({children, params}: LocaleLayoutProps){
  const { locale  } = await params
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ReduxProvider>
              {children}
            </ReduxProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}