// Extending MUI Dialog type to accept data-cy prop

declare module '@mui/material/Dialog' {
  export interface DialogProps extends StandardProps<ModalProps, 'children'> {
    /**
     * The id(s) of the element(s) that describe the dialog.
     */
    'aria-describedby'?: string;
    /**
     * The id(s) of the element(s) that label the dialog.
     */
    'aria-labelledby'?: string;
    /**
     * Dialog children, usually the included sub-components.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<DialogClasses>;
    /**
     * If `true`, hitting escape will not fire the `onClose` callback.
     * @default false
     */
    disableEscapeKeyDown?: boolean;
    /**
     * If `true`, the dialog is full-screen.
     * @default false
     */
    fullScreen?: boolean;
    /**
     * If `true`, the dialog stretches to `maxWidth`.
     *
     * Notice that the dialog width grow is limited by the default margin.
     * @default false
     */
    fullWidth?: boolean;
    /**
     * Determine the max-width of the dialog.
     * The dialog width grows with the size of the screen.
     * Set to `false` to disable `maxWidth`.
     * @default 'sm'
     */
    maxWidth?: Breakpoint | false;
    /**
     * Callback fired when the backdrop is clicked.
     * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
     */
    onBackdropClick?: ModalProps['onBackdropClick'];
    /**
     * Callback fired when the component requests to be closed.
     *
     * @param {object} event The event source of the callback.
     * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
     */
    onClose?: ModalProps['onClose'];
    /**
     * If `true`, the component is shown.
     */
    open: ModalProps['open'];
    /**
     * The component used to render the body of the dialog.
     * @default Paper
     */
    PaperComponent?: React.JSXElementConstructor<PaperProps>;
    /**
     * Props applied to the [`Paper`](/material-ui/api/paper/) element.
     * @default {}
     */
    PaperProps?: Partial<PaperProps>;
    /**
     * Determine the container for scrolling the dialog.
     * @default 'paper'
     */
    scroll?: 'body' | 'paper';
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;

    /* This it MUI DEFAULT COMPONENT Interface just added here data-cy support */

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TransitionComponent?: React.JSXElementConstructor<TransitionProps & { children: React.ReactElement<any, any> }>;
    /**
     * The duration for the transition, in milliseconds.
     * You may specify a single timeout for all transitions, or individually with an object.
     * @default {
     *   enter: theme.transitions.duration.enteringScreen,
     *   exit: theme.transitions.duration.leavingScreen,
     * }
     */
    transitionDuration?: TransitionProps['timeout'];
    /**
     * Props applied to the transition element.
     * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
     */
    TransitionProps?: TransitionProps;
    'data-cy'?: string;
  }
}
