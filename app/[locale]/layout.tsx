import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/providers/theme-provider';
import { ReduxProvider } from '@/redux/provider';
import { LocaleProvider } from '../context/locale-context';
import Haeader from '../_components/header';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'


interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: 'ru'| 'en' }>
}
export default async function LocaleLayout({children, params}: LocaleLayoutProps){
  const { locale  } = await params
  if (!routing.locales.includes(locale)) {
    notFound()
  }
  setRequestLocale(locale);
  const messages = await getMessages()
 
  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang={locale}>
        <body>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider attribute='class' defaultTheme='system'>
              <LocaleProvider locale={locale}>
                  <ReduxProvider>
                    <Haeader/>
                    {children}
                  </ReduxProvider>
              </LocaleProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}