// imported  with: https://app.quicktype.io/
import { Insight, DataSource, TableSchema } from './..';

/**
 * Data Package is a simple specification for data access and delivery.
 */
export interface DataPackage {
    /**
     * The contributors to this descriptor.
     */
    contributors?: Contributor[];
    /**
     * The datetime on which this descriptor was created.
     */
    created?: Date;
    /**
     * A text description. Markdown is encouraged.
     */
    description?: string;
    /**
     * The home on the web that is related to this data package.
     */
    homepage?: string;
    /**
     * A property reserved for globally unique identifiers. Examples of identifiers that are
     * unique include UUIDs and DOIs.
     */
    id?: string;
    /**
     * A image to represent this package.
     */
    image?: string;
    /**
     * A list of keywords that describe this package.
     */
    keywords?: string[];
    /**
     * The license(s) under which this package is published.
     */
    licenses?: DataPackageLicense[];
    /**
     * An identifier string. Lower case characters with `.`, `_`, `-` and `/` are allowed.
     */
    name?: string;
    /**
     * The profile of this descriptor.
     */
    profile?: string;
    /**
     * An `array` of Data Resource objects, each compliant with the [Data
     * Resource](/data-resource/) specification.
     */
    resources: DataResource[];
    /**
     * The raw sources for this resource.
     */
    sources?: DataPackageSource[];
    /**
     * A human-readable title.
     */
    title?: string;
    insights?: Insight[];
}

/**
 * A contributor to this descriptor.
 */
export type Contributor = any[] | boolean | number | number | null | ContributorObject | string;

export interface ContributorObject {
    /**
     * An email address.
     */
    email?: string;
    /**
     * An organizational affiliation for this contributor.
     */
    organisation?: string;
    /**
     * A fully qualified URL, or a POSIX file path..
     */
    path?: string;
    role?: Role;
    /**
     * A human-readable title.
     */
    title: string;
}

export enum Role {
    Author = "author",
    Contributor = "contributor",
    Maintainer = "maintainer",
    Publisher = "publisher",
    Wrangler = "wrangler",
}

/**
 * A license for this descriptor.
 */
export interface DataPackageLicense {
    /**
     * MUST be an Open Definition license identifier, see http://licenses.opendefinition.org/
     */
    name?: string;
    /**
     * A fully qualified URL, or a POSIX file path..
     */
    path?: string;
    /**
     * A human-readable title.
     */
    title?: string;
}

/**
 * Data Resource.
 */
export interface DataResource {
    /**
     * The size of this resource in bytes.
     */
    bytes?: number;
    /**
     * Inline data for this resource.
     */
    data?: DataSource;
    /**
     * A text description. Markdown is encouraged.
     */
    description?: string;
    /**
     * The file encoding of this resource.
     */
    encoding?: string;
    /**
     * The file format of this resource.
     */
    format?: string;
    /**
     * The MD5 hash of this resource. Indicate other hashing algorithms with the
     * {algorithm}:{hash} format.
     */
    hash?: string;
    /**
     * The home on the web that is related to this data package.
     */
    homepage?: string;
    /**
     * The license(s) under which the resource is published.
     */
    licenses?: DataResourceLicense[];
    /**
     * The media type of this resource. Can be any valid media type listed with
     * [IANA](https://www.iana.org/assignments/media-types/media-types.xhtml).
     */
    mediatype?: string;
    /**
     * An identifier string. Lower case characters with `.`, `_`, `-` and `/` are allowed.
     */
    name: string;
    /**
     * A reference to the data for this resource, as either a path as a string, or an array of
     * paths as strings. of valid URIs.
     */
    path?: Path;
    /**
     * The profile of this descriptor.
     */
    profile?: string;
    /**
     * A schema for this resource.
     */
    schema?: TableSchema;

    style?: any;
    /**
     * The raw sources for this resource.
     */
    sources?: DataResourceSource[];
    /**
     * A human-readable title.
     */
    title?: string;
    /**
     * Organisation provinding the data
     */
    organisation?: string;

    /**
     * Image for this resource
     */
    image?: string;
}

/**
 * A license for this descriptor.
 */
export interface DataResourceLicense {
    /**
     * MUST be an Open Definition license identifier, see http://licenses.opendefinition.org/
     */
    name?: string;
    /**
     * A fully qualified URL, or a POSIX file path..
     */
    path?: string;
    /**
     * A human-readable title.
     */
    title?: string;
}

/**
 * A reference to the data for this resource, as either a path as a string, or an array of
 * paths as strings. of valid URIs.
 */
export type Path = string[] | string;

/**
 * A source file.
 */
export interface DataResourceSource {
    /**
     * An email address.
     */
    email?: string;
    /**
     * A fully qualified URL, or a POSIX file path..
     */
    path?: string;
    /**
     * A human-readable title.
     */
    title: string;
}

/**
 * A source file.
 */
export interface DataPackageSource {
    /**
     * An email address.
     */
    email?: string;
    /**
     * A fully qualified URL, or a POSIX file path..
     */
    path?: string;
    /**
     * A human-readable title.
     */
    title: string;
}
