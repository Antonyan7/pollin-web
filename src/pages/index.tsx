import React, { PropsWithChildren } from 'react';
import MainLayout from 'layout/MainLayout';

const Main = ({ children }: PropsWithChildren) => <MainLayout>{children}</MainLayout>;

export default Main;
