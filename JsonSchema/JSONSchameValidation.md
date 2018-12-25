# JSON Schema Validation: A Vocabulary for Structural Validation of JSON



## Abstract


JSON Schema(application/schema+json) has several purposes, one of which is JSON instance validation. This document specifies a vocabulary for JSON Schema to describe the meaning of JSON documents, provide hints for user interfaces working with JSON data, and to make assertions about what a valid document must look like.




## 索引

使用JSON Schema(application/schema+json)有许多目的，其中之一就是JSON实例校验。此文档指定了一份JSON Schema词汇表，用于描述JSON文档的含义，提供与JSON数据交互所需的用户界面的提示信息，并对文档的合法性就行断言。


## Note to Readers

The issues list for this draft can be found at \<https://github.com/json-schema-org/json-schema-spec/issues\>.

For additional information, see \<http://json-schema.org\>.

To provide feedback, use this issue tracker, the communication methods listed on the homepage, or email the document editors.

## 读者须知

此草案的问题列表详见\<https://github.com/json-schema-org/json-schema-spec/issues\>。

更多信息，参考For additional information, see \<http://json-schema.org\>。

如需提供反馈，可以通过issue追踪、主页上的社区方法，或者直接email文档编辑。


----------------



# Introduction
   
JSON Schema can be used to require that a given JSON document(an instance) satisfies a certain number of criteria. These criteria are asserted by useing keywords described in this specification. In addition, a set of keywords is also defined to assist in interactive user interface instance generation.

This specification will use the concepts, syntax, and terminology defined by the JSON Schema core[json-schema] specification

# 简介

对于给定的JSON文档（一个实例）是否满足一系列的规则，JSON Schema通常是必须的。这些规则使用规范里描述的关键字来定义。此外，还有一些关键字，用于帮助交互式用户界面实例的生成。


此规范将用JSON Schema core 中定义的概念，语法以及术语。


# conventions and Terminology

The keywords "MUST", "MUST NOT", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

This specification uses the term "container instance" to refer to both array and object instances. It uses the term "children instances" to refer to array elements or object member values.

Elemencts in an array value are said to be unuque if no two elements of this array are equal.


# 惯例与术语

关键字"MUST", "MUST NOT", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL"的解释在RFC 2119中均有描述

本规范使用术语“容器实例”囊括了数组实例和对象实例。使用“子实例”来指代其中的数组元素或对象成员的值。

如果数组中没有两个相同的元素，则称此数组中的元素是唯一的。


# Overview

JSON Schema validation applies schemas to locations within the instance, and asserts constraints on the structure of the data at each location. An instsance location that satisfies all asserted constraints is then annotated with any keywords that contain non-assertion information, such as descriptive metadata and usage hints. If all locations within the instance satisfy all asserted constraints, the  instance is said to be valid against the schema.


Each schema object is independently evaluated against each instance location to which it applies. This greatly simplifies the implementation requirements for validators by ensuring that they do not need to maintain state across the document-wide validation process.




# 概述

JSON Schema校验将“模式”(schemas)用于实例中的位置，并且对位置对应的数据结构进行约束性断言。一个满足所有约束性断言的位置实例会被用一些关键字进行注释（如非断言信息或描述性元数据）。如果实例中的所有位置满足所有的约束断言，则称此实例对schema而言是合法的。

对于每个应用schema的实例位置而言，schema对象都是独立计算的。这使得验证器不需要在文档范围的验证过程维护状态，从而简化了验证器的实现需求。



## 3.1 Applicability

Validation begins by applying the root schema to the complete instance document. From there, various keywords are used to determin which additinal subschemas are applied to either the current location, or a child location. These keywords also define whether and how subschema assertion results are modified and/or combined. Such keywords do not assert conditions on their own. Rather, they control how assertions are applied and evaluated.


The keywords in the boolean logic [logic] and conditional [conditional] sections of this specification apply subschemas to the same location as the parent schema. The former group defines boolean operations on the subschema assertion results, while the latter evaluates one subschema and uses its assertion results to determine which of two other subschemas to apply as well.

Several keywords determine which subschemas are applied to array items, object property values, and object property names. They are: "items", "additionalItems", "contains", "properties", "patternProperties", "additionalProperties", and "propertyNames". The "contains" keyword only requires its subschema to be valid against at least one child instance, while the other keywords require that all subschemas are valid against all child instances to which they apply.


## 3.1 适用性

验证首先将根schema用于整个实例文档，然后，使用各种关键字来确定哪些附加的子schema应用于当前位置或子位置。这些关键字还定义了是否以及如何修改和/或组合子模式断言结果。这些关键字本身并不断言条件。相反，它们控制断言的应用和计算方式。

本规范的布尔逻辑[逻辑]和条件[条件]部分中的关键字将子模式应用到与父模式相同的位置。前者对子模式断言结果定义了布尔操作，而后者计算一个子模式，并使用它的断言结果来确定另外两个子模式中的哪一个也要应用。



几个关键字决定哪些子模式应用于数组项、对象属性值和对象属性名称。它们是:“items”、“additionalItems”、“contains”、“properties”、“patternProperties”、“additionalProperties”和“propertyNames”。“contains”关键字只要求它的子模式对至少一个子实例有效，而其他关键字要求所有子模式对它们应用到的所有子实例有效。



### 3.1.1 Keyword Independence 

Validation keywords typically operate independently, without affecting each other's outcomes.

For schema author convenience, there are some exceptions among the keywords that control subschema applicability:

"additionalProperties", whose behavior is defined in terms of "properties" and "patternProperties"; and
"additionalItems", whose behavior is defined in terms of "items".


### 3.1.1 关键字独立性

验证关键字通常独立操作，不会影响彼此的结果。

为了方便Schema作者，在控制子模式适用性的关键字中有一些例外：

“additionalProperties”：行为由“propterties”和“patternProperties”共同定义；

“additionalItems”： 行为由“items”定义。

## 3.2 Assertions

Validation is a process of checking assertions. Each assertion adds constraints that an instance must satisfy in order to successfully validate.

Assertion keywords that are absent never restrict validation. In some cases, this no-op behavior is identical to a keyword that exists with certain values, and these values are noted where known.

All of the keywords in the general, numeric, and string sections are assertions, as well as "minItems", "maxItems", "uniqueItems", "minProperties", "maxProperties", and "required". Additionally, "dependencies" is shorthand for a combination of conditional and assertion keywords.

The "format", "contentType", and "contentEncoding" keywords can also be implemented as assertions, although that functionality is an optional part of this specification, and the keywords convey additional non-assertion information.



## 3.2 断言

校验是一种检测断言的方式。为了能成功校验，一个实例必须满足每个断言添加的约束。


如果没有定义断言关键泽不会进行校验。在一些情况下，无操作行为于存在确定值的关键字是相同的，这些值会在已知的地方标注。

general，numeric和string章节中的所有关键字都是断言，以及 "minItems", "maxItems", "uniqueItems", "minProperties", "maxProperties", 和 "required"。此外，“dependencies”则是条件关键字和断言关键字组合的缩写。

“format”、“contentType”和“contentEncoding”关键字也可以实现为断言，尽管该功能是该规范的可选部分，而且关键字传递了额外的非断言信息。


### 3.2.1 Assertions and Instance Primitive Types

Most validation assertions only constrain values within a certain primitive type. When the type of instance is not of the type targeted by keyword, the instance is considered to conform to the assertion.

For example the "maxLength" keyword will only restric certain strings(that are too long) from being valid. If the instance is a number, boolean, null, array, or object, then iti s valid against this assertion.

### 3.2.1 断言和实例原始类型

大部分校验断言只对具体的原始类型进行约束。当实例的类型不是关键字制定的类型，则实例就被认为是符合断言的。

例如，“maxLength”关键字只能约束指定字符串（过长）的合法性。但如果实例是number,boolean,null,array或object，则该实例一定能通过断言。




## 3.3 Annotations

In addition to assertions, this specification provides a small vocabulary of metadata keywords that can be used to annotate the JSON instance with useful information. The Section7 and Section 8 keywords are also useful as annotations as well as being optional assertions, as they convey additional usage guidance for the instance data.

A schema that is applicable to a particular location in the instance, against which the instance location is valid, attaches its annotations to that location in the instance. Since many subschemas can be applicable to any single location, annotation keyword need to specify any unusual handling of multiple applicable occurrences of the keyword with different values. The default behavior is simply to collect all values.

Additional vocabularies SHOULD make use of this mechanism for applying their own annotations to instances.



## 3.3 注解
除了断言之外，该规范还提供了一小部分元数据关键字词汇表，可以使用这些词汇表用有用的信息对JSON实例进行注释。Section7和Section 8关键字与注释以及可选断言一样有用，因为它们为实例数据提供了额外的使用指南。

一个schema适用于实例中的特定位置，且实例中某个位置是合法的，则会将注解与实例中的位置相联。由于许多子模式可以适用于任何单个位置，因此注释关键字需要指定对具有不同值的关键字的多次出现的异常处理。默认行为是简单地收集所有值。

其他词汇表应该使用这种机制将它们自己的注释应用到实例。



### 3.3.1 Annotations and Validation Outcomes

Annotations are collected whenever an instance is valid against a schema object, and all of that schema object's parent schemas.

In particular, annotations in a subschema contained within a "not", not any depth, including any number of intervening additional "not" subschemas, MUST be ignored. If the instance was valid against the "not" subschema, then by definition it is not valid against the schema that contains the "not", so the "not" subschema's annotations are not used.

Similarly, annotations within a failing branch of a "oneOf", "anyOf", "then", or "else" MUST be ignored even when the instance successfully validates against the complete schema document.



### 3.3.1 注解与校验结果

只要实例对schema对象以及该schema对象的所有父schema有效，就会收集注释。

特别是，必须忽略“not”中包含的子schema中的注释，在任何深度上，包括任何数量的插入的额外“not”子schema。如果实例对“not”子schema有效，那么根据定义，它对包含“not”的schema无效，因此不使用“not”子schema的注释。




类似地，必须忽略“oneOf”、“anyOf”、“then”或“else”分支中失败的注释，即使实例成功地对完整的模式文档进行验证。




### 3.3.2 Annotations and Short-Circuit Validation

Annotation keywords MUST be applied to all possible sub-instances. Even if such application can be short-circuited when only assertion evaluation is needed. For instance, the "contains" keyword need only be checked for assertions until at least one array item proves valid. However, when working with annotations, all items in the array must be evaluated to determine all items with which the annotations should be associated.



# 4 Interoperability Considerations

# 4 互操作性考虑


## 4.1 Validation of String Instances

It should be noted that the null character(\u0000) is valid in a JSON string. An instance to validate may contain a string value with this character, regardless of the ability of the underlying programming language to deal with such data.

## 4.1 字符串实例校验

需要注意的是null字符(\u0000)在JSON字符串中是有效的。要验证的实例可能包含具有此字符的字符串值，而不管底层编程语言处理此类数据的能力如何。


## 4.2 Validation of Numeric Instances

The JSON specification allows numbers with arbitrary precision, and JSON Schema does not add any such bounds. This means that numeric instances processed by JSON Schema canbe arbitrarily large and/or have an arbitrarily long decimal part, regradless of the ability of the underlying programming language to deal with such data.


## 4.2 数字实例校验

JSON规范允许具有任意精度的数字，JSON模式不添加任何此类界限。这意味着JSON模式处理的数值实例可以是任意大的和/或具有任意长的小数部分，而底层编程语言处理此类数据的能力是不可分级的。


# 6 Validation Keywords

Validation keywords in a schema impose requirements for successful validation of an instance.



## 6.1 Validation Keywords for Any Instance Type

### 6.1.1 type

The value of this keyword MUST be either a string or an array. If it is an array, elements of the array MUST be strings and MUST be unique.

String values MUST be one of the six primitive types ("null", "boolean", "object", "array", "number", or "string"), or "integer" which matches any number with a zero fractional part.

An instance validates if and only if the instance is in any of the sets listed for this keyword.




### 6.1.1 type

这个关键字的值必须是字符串或数组。如果它是一个数组，数组的元素必须是字符串并且必须是唯一的。

字符串值必须是六种基本类型(“null”、“boolean”、“object”、“array”、“number”或“String”)或“integer”中的一种，这六种类型匹配任何小数部分为零的数字。

当且仅当实例位于为该关键字列出的任何集合中时，实例才会验证。


### 6.1.2 enum
The value of this keyword MUST be an array. This array SHOULD have at least one element. Elements in the array SHOULD be unique.

An instance validates successfully against this keyword if its value is equal to one of the elements in this keyword's array value.

Elements in the array might be of any value, including null.


### 6.1.2 枚举

枚举关键字的值必须是一个数组。这个数组应该至少有一个元素。数组中的元素必须是唯一的。

如果实例的值与该关键字数组中的值相等，则实例可以成功完成对次关键字的校验。


数组中的元素可以使任意值，包括null。


### 6.1.3 const


The value of this keyword MAY be of any type, including null.

An instance validates successfully against this keyword if its value is equal to the value of the keyword.


### 6.1.3 const

该关键字的值可以使任何值，包括null。

如果实例的值与关键字的相等，则该实例可以通过该关键字的校验。


## 6.2 Validaton Keywords for Numeric Instances(number and integer)

## 6.2 数值（数字与整数）实例的关键字校验

### 6.2.1 multipleOf

The value of "multipleOf" MUST be a number, strictly greater than 0.

A numeric instance is valid only if division by this keyword's value results in an integer.


### 6.2.1 倍数

"multipleOf" 关键字的值必须是一个数字，且严格大于0。

数值实例只有当其值可以被关键字的值整除时，才被定义为合法。

### 6.2.2 maximum

The value of "maximum" MUST be a number, representing an inclusive upper limit for a numeric instance.

If the instance is a number, then this keyword validates only if the instance is less than or exactly equal to "maximum".

### 6.2.2 maximum（最大值）

"maximum"关键字的值必须是一个数字，表示一个数值实例的包含上限。

如果实例是一个数字，当实例比"maximum"更小或相等时，可以通过关键字校验

### 6.2.3 exclusiveMaximum

The value of "exclusiveMaximum" MUST be number, representing an exclusive upper limit for a numeric instance.

If the instance is a number, then this keyword validates only if the instance is strictly less than (not equal to) "exclusiveMaximum".

### 6.2.3 不包含的最大值

"exclusiveMaximum"关键字的值必须是一个数字，代表了该数值实例的取值范围的不包含上限。

如果该实例是个数字，当其严格小于（且不等于）"exclusiveMaximum"时，可以通过校验


### 6.2.4 minimum

### 6.2.5 exclusiveMinimum


## 6.3 Validation Keywords for Strings

### 6.3.1 maxLength

### 6.3.2 minLenght

### 6.3.3 pattern


## 6.4 Validation Keywords for Arrays

###6.4.1 items

The value of "items" MUST be either a valid JSON Schema or an array of valid JSON Schemas.

This keyword determines how child instances validate for arrays, and does not directly validate the immediate instance itself.

If "items" is a schema, validation succeeds if all elements in the array successfully validate against that schema.

If "items" is an array of schemas, validation succeeds if each element of the instance validates against the schema at the same position, if any.

Omitting this keyword has the same behavior as an empty schema.

### 6.4.1 items

"items" 的值必须是一个有效的JSON Schema 或一个 JSON Schema的数组。

这个关键字决定了子实例如何验证数组，而不是直接验证实例本身。

如果"items"字段是一个schema，只当数组中的所有元素都完成基于此schema校验时，他本身的校验才会成功。

如果“items”是schema数组，那么如果实例的每个元素在相同的位置(如果有的话)对schema进行验证，那么验证将成功。

省略此关键字将按照空schema处理。


### 6.4.2 additionalItems

The value of "additionalItems" MUST be a valid JSON Schema.

This keyword determins how child instances validate for arrays, and does not directly validate the immediate instance itself.

if "items" is an array of schemas, validation succeeds if every instance element at a position greater than the size of "items" validates against "additionalItems".

Otherwise, "additionalItems" MUST be ignored, as the "items" schema (possibly the default value of an empty schema) is applied to all elements.

Omitting this keyword has the same behavior as an empty schema.


### 6.4.2 additionalItems

"additionalItems" 关键字的值必须是一个有效的JSON Schema。

这个关键字决定了子实例是如何校验数组的，而不是直接校验实例本身。

如果"items"关键字是一个schema数组，那么当对items规定位置之外的每个元素都进行"additionalItems"验证成功，则验证成功。

否则，“additionalItems”必须被忽略，因为“items”schema(可能是空schema的默认值)应用于所有元素。


省略这个关键字与空schema具有相同的行为。





