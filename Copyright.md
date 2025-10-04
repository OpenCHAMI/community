# Copyright Statement for OpenCHAMI project contributions

`Copyright © 2025 OpenCHAMI a Series of LF Projects, LLC`

# Following the REUSE Guidelines

This project aims to follow the [REUSE Specification](https://reuse.software/spec-3.3/).  
Every source file in this repository must include the following information:

## 1. Copyright Notice
Add one or more lines at the top of the file:

```
SPDX-FileCopyrightText: Copyright © YEAR OpenCHAMI a Series of LF Projects, LLC
```

- Include the year (or year range) of authorship.  
- Repeat the line for each copyright holder if multiple exist.

## 2. License Identifier
Add the SPDX license expression immediately after the copyright:

```
SPDX-License-Identifier: MIT
```

- Use a valid [SPDX license identifier](https://spdx.org/licenses/).  
- Complex expressions (e.g., `GPL-3.0-or-later OR MIT`) are allowed.  

## 3. Placement
- Place these lines in a comment header at the top of the file.  
- For files without comments (e.g. images, binaries, data), create a sidecar file named `<filename>.license` containing the same tags.

## 4. License Texts
- Every license identifier used in the code must have its full license text included in the `LICENSES/` directory.  
- Do not include unused licenses.

## 5. Encoding
- Use UTF-8 for files containing headers.

---

## In Go code header
```go
// SPDX-FileCopyrightText: Copyright © 2025 OpenCHAMI a Series of LF Projects, LLC
//
// SPDX-License-Identifier: MIT
```

## In YAML files
```yaml
## SPDX-FileCopyrightText: Copyright © 2025 OpenCHAMI a Series of LF Projects, LLC
##
## SPDX-License-Identifier: MIT
```


Follow the Linux Foundation Guidance on existing and new copyright contributions. [Copyright Notices in Open Source Software Projects](https://www.linuxfoundation.org/blog/blog/copyright-notices-in-open-source-software-projects)