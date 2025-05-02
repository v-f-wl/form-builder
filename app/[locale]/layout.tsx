import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/providers/theme-provider';
import { ReduxProvider } from '@/redux/provider';
import { LocaleProvider } from '../context/locale-context';
import Header from '../_components/header';
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { BootstrapThemeSync } from '@/hooks/theme/BootstrapThemeSync';
import { Toaster } from 'react-hot-toast';
import { PermissionProvider } from '../context/permission-context';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: 'ru'| 'en' }>
}

export const metadata = {
  title: "Form Helper",
};

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
        <body className="amp-mask">  {/*todo: remove class*/}
          <PermissionProvider>
            <NextIntlClientProvider messages={messages}>
              <ThemeProvider attribute='class' defaultTheme='system'>
                <BootstrapThemeSync />
                <LocaleProvider locale={locale}>
                    <ReduxProvider>
                      <Header/>
                      {children}
                      <Toaster position="bottom-right"/>
                    </ReduxProvider>
                </LocaleProvider>
              </ThemeProvider>
            </NextIntlClientProvider>
          </PermissionProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}