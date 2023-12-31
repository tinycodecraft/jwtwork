﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace JwtWork.PISDB.Models;

public partial class PSItemLink
{
    [Key]
    public int Id { get; set; }

    public int FileCategoryId { get; set; }

    public int FileSubCategoryId { get; set; }

    public int PSItemId { get; set; }

    [ForeignKey("FileCategoryId")]
    [InverseProperty("PSItemLink")]
    public virtual FileCategory FileCategory { get; set; }

    [ForeignKey("FileSubCategoryId")]
    [InverseProperty("PSItemLink")]
    public virtual FileSubCategory FileSubCategory { get; set; }

    [ForeignKey("PSItemId")]
    [InverseProperty("PSItemLink")]
    public virtual PSItem PSItem { get; set; }
}