import { FormField, Form } from '../form/form-decorators';
export class ToolbarOptions {
    public hide?: boolean;
    @FormField({ title: 'Flat', type: 'checkbox' })
    public flat?: boolean;
    @FormField({ title: 'Dense', type: 'checkbox' })
    public dense?: boolean;
    @FormField({ title: 'Hide Icon', type: 'checkbox' })
    public hideIcon?: boolean;
    @FormField({ title: 'Hide Title', type: 'checkbox' })
    public hideTitle?: boolean;
    @FormField({ title: 'Elevation', type: 'number', min: 0, max: 11 })
    public elevation?: number;
}

export class DashboardToolbarOptions extends ToolbarOptions {
    public navigation = 'stepper' || 'stepper-inline' || 'tabs';
}
