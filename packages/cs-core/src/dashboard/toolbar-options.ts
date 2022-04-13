import { FormField, Form } from '../form/form-decorators';
@Form({ title: 'Toolbar options'})
export class ToolbarOptions {
    @FormField({ title: 'Background Color', type: 'string' })
    public backgroundColor?: string;
    public hide?: boolean;
    @FormField({ title: 'Flat', type: 'checkbox' })
    public flat?: boolean;
    @FormField({ title: 'Dense', type: 'checkbox' })
    public dense?: boolean;
    @FormField({ title: 'Hide Icon', type: 'checkbox' })
    public hideIcon?: boolean;
    @FormField({ title: 'Hide Title', type: 'checkbox' })
    public hideTitle?: boolean;
    @FormField({ title: 'Prominent', type: 'checkbox' })
    public prominent?: boolean;
    @FormField({ title: 'Outlined', type: 'checkbox' })
    public outlined?: boolean;
    @FormField({ title: 'Collapse', type: 'checkbox' })
    public collapse?: boolean;
    @FormField({ title: 'Absolute', type: 'checkbox' })
    public absolute?: boolean;
    @FormField({ title: 'Elevation', type: 'slider', min: 0, max: 10 })
    public elevation?: number;
    @FormField({ title: 'Background Image', type: 'string'})
    public backgroundImage?: string;
}
